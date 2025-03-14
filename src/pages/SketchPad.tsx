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

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      // Restore drawing settings after resize
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = options.color;
      context.lineWidth = options.width;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [options]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setIsDrawing(true);
    setLastPoint(point);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(currentPoint.x, currentPoint.y);
    context.stroke();

    setLastPoint(currentPoint);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    toast({
      title: 'Canvas cleared',
      description: 'The drawing has been cleared.',
    });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'sketch.png';
      link.href = dataUrl;
      link.click();

      toast({
        title: 'Drawing saved',
        description: 'Your drawing has been saved as PNG.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save the drawing.',
        variant: 'destructive',
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const newColor = e.target.value;
    context.strokeStyle = newColor;
    setOptions((prev) => ({ ...prev, color: newColor }));
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const newWidth = parseInt(e.target.value);
    context.lineWidth = newWidth;
    setOptions((prev) => ({ ...prev, width: newWidth }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sketchpad</h1>
        <p className="text-muted-foreground">
          Draw and visualize your ideas. Use the tools below to customize your
          drawing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Color</h3>
          <input
            type="color"
            value={options.color}
            onChange={handleColorChange}
            className="w-full h-10"
          />
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Line Width</h3>
          <input
            type="range"
            min="1"
            max="20"
            value={options.width}
            onChange={handleWidthChange}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {options.width}px
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={clearCanvas}
          >
            Clear Canvas
          </Button>
        </Card>

        <Card className="p-4 flex items-center justify-center">
          <Button className="w-full" onClick={saveDrawing}>
            Save Drawing
          </Button>
        </Card>
      </div>

      <Card className="w-full aspect-video relative overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="w-full h-full cursor-crosshair"
        />
      </Card>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          Tip: Click and drag to draw. Use the color picker and line width slider
          to customize your drawing. Don't forget to save your work!
        </p>
      </div>
    </div>
  );
};

export default SketchPad;
