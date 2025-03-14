import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { roadmaps } from '@/lib/roadmapData';

interface Resource {
  name: string;
  url: string;
}

interface Project {
  title: string;
  description: string;
  skills: string[];
  difficulty: string;
}

const RoadmapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const roadmap = roadmaps.find((r) => r.id === id);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  if (!roadmap) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Roadmap Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The roadmap you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const renderResources = (resources: { title: string; links: Resource[] }[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Card key={resource.title} className="p-4">
          <h3 className="font-semibold mb-2">{resource.title}</h3>
          <ul className="space-y-2">
            {resource.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );

  const renderProjects = (projects: Project[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.title} className="p-4">
          <h3 className="font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium">Skills: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">Difficulty: </span>
              <span className="text-sm text-muted-foreground">
                {project.difficulty}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
        <p className="text-muted-foreground">{roadmap.description}</p>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {roadmap.level}
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
            {roadmap.duration}
          </div>
          {roadmap.prerequisites.length > 0 && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Prerequisites: {roadmap.prerequisites.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold">Learning Path</h2>
        {roadmap.sections.map((section) => (
          <Card key={section.title} className="p-4">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${expandedSections.includes(section.title) ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedSections.includes(section.title) && (
              <div className="mt-4 space-y-4">
                {section.topics.map((topic) => (
                  <div key={topic.title} className="pl-4 border-l-2">
                    <h4 className="font-semibold mb-2">{topic.title}</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      {topic.items.map((item) => (
                        <li key={item} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Resources */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        {renderResources(roadmap.resources)}
      </div>

      {/* Projects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Practice Projects</h2>
        {renderProjects(roadmap.projects)}
      </div>
    </div>
  );
};

export default RoadmapDetail;
