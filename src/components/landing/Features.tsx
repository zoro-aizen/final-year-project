import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'Personalized Learning Paths',
    description:
      'Create customized roadmaps tailored to your goals and current skill level.',
    icon: '🎯',
  },
  {
    title: 'Progress Tracking',
    description:
      'Monitor your learning journey with detailed progress analytics and milestones.',
    icon: '📊',
  },
  {
    title: 'Community Support',
    description:
      'Connect with fellow learners, share experiences, and get help when needed.',
    icon: '👥',
  },
  {
    title: 'Expert-Curated Content',
    description:
      'Access high-quality learning resources vetted by industry experts.',
    icon: '📚',
  },
];

export const Features = () => {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Why Choose Miles?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
