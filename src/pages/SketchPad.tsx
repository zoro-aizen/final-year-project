import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface Point {
  x: number;
  y: number;
}

interface DrawingOptions {
  color: string;
  width: number;
}

const SketchPad = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const { toast } = useToast();

  const [options, setOptions] = useState<DrawingOptions>({
    color: '#000000',
    width: 2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCanvasPoint = (event: MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event instanceof MouseEvent) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      // Touch event
      const touch = event.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    }

    return { x, y };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const point = getCanvasPoint(
      event.nativeEvent as MouseEvent | TouchEvent
    );
    if (!point) return;

    setIsDrawing(true);
    setLastPoint(point);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPoint) return;

    const currentPoint = getCanvasPoint(
      event.nativeEvent as MouseEvent | TouchEvent
    );
    if (!currentPoint) return;

    ctx.beginPath();
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast({
      title: 'Canvas Cleared',
      description: 'The sketch pad has been cleared.',
    });
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'sketch.png';
      link.href = dataUrl;
      link.click();

      toast({
        title: 'Sketch Saved',
        description: 'Your sketch has been downloaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save the sketch. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sketch Pad</h1>
        <p className="text-muted-foreground">
          Use this space to sketch out your ideas or take visual notes.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <label htmlFor="color" className="text-sm font-medium">
              Color:
            </label>
            <input
              type="color"
              id="color"
              value={options.color}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, color: e.target.value }))
              }
              className="h-8 w-12 cursor-pointer"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <label htmlFor="width" className="text-sm font-medium">
              Width:
            </label>
            <input
              type="range"
              id="width"
              min="1"
              max="20"
              value={options.width}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  width: parseInt(e.target.value),
                }))
              }
              className="w-32"
            />
            <span className="text-sm">{options.width}px</span>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" onClick={clearCanvas}>
            Clear
          </Button>
          <Button onClick={saveCanvas}>Save</Button>
        </div>
      </div>

      <Card className="aspect-video w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </Card>

      <div className="mt-4">
        <h2 className="mb-2 text-xl font-semibold">Tips:</h2>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>Click and drag to draw</li>
          <li>Use the color picker to change colors</li>
          <li>Adjust the line width using the slider</li>
          <li>Click 'Clear' to start over</li>
          <li>Click 'Save' to download your sketch</li>
        </ul>
      </div>
    </div>
  );
};

export default SketchPad;
