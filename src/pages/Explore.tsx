import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { roadmaps } from '@/lib/roadmapData';

interface Category {
  id: string;
  name: string;
}

interface Level {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'development', name: 'Development' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'design', name: 'Design' },
  { id: 'blockchain', name: 'Blockchain' },
];

const levels: Level[] = [
  { id: 'all', name: 'All Levels' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesCategory =
      selectedCategory === 'all' || roadmap.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'all' || roadmap.level === selectedLevel;
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Roadmaps</h1>
        <p className="text-muted-foreground">
          Discover learning paths curated by experts and the community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Filters */}
        <Card className="p-4 h-fit">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Search</h3>
              <Input
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Level</h3>
              <div className="space-y-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedLevel === level.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                      }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Roadmaps Grid */}
        <div className="space-y-4">
          {filteredRoadmaps.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">
                No roadmaps found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRoadmaps.map((roadmap) => (
                <Link
                  key={roadmap.id}
                  to={`/roadmap/${roadmap.id}`}
                  className="block"
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">
                      {roadmap.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {roadmap.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          {roadmap.level}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {roadmap.duration}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
