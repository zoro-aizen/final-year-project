import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About Miles</h1>
        <p className="text-xl text-muted-foreground">
          Your personal roadmap to success in tech learning
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Feature
          title="Personalized Learning Paths"
          description="Create customized roadmaps tailored to your goals and current skill level."
          icon="🎯"
        />
        <Feature
          title="Progress Tracking"
          description="Monitor your learning journey with detailed progress analytics."
          icon="📊"
        />
        <Feature
          title="Community Support"
          description="Connect with fellow learners and share experiences."
          icon="👥"
        />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <p className="text-lg leading-relaxed text-card-foreground">
            Miles is dedicated to making technology education accessible and structured.
            We believe in empowering learners by providing clear pathways to achieve their
            tech career goals. Our platform combines expert-curated content with
            community-driven insights to create the most effective learning experience.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StepCard
            number="1"
            title="Choose Your Path"
            description="Select from our curated roadmaps or create your own custom learning path."
          />
          <StepCard
            number="2"
            title="Track Progress"
            description="Mark your progress as you complete learning objectives and milestones."
          />
          <StepCard
            number="3"
            title="Get Support"
            description="Connect with mentors and peers for guidance and motivation."
          />
          <StepCard
            number="4"
            title="Achieve Goals"
            description="Reach your learning objectives and advance your tech career."
          />
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
        <p className="text-lg mb-8 text-muted-foreground">
          Be part of a growing community of tech enthusiasts and learners.
        </p>
        <Button size="lg" className="mr-4">
          Get Started
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <div className="space-y-4">
          <FaqItem
            question="Is Miles free to use?"
            answer="Yes, Miles offers a free tier with access to basic features. Premium features are available through paid subscriptions."
          />
          <FaqItem
            question="Can I create custom roadmaps?"
            answer="Absolutely! Miles allows you to create, customize, and share your own learning roadmaps."
          />
          <FaqItem
            question="How do I track my progress?"
            answer="Miles provides built-in progress tracking tools, including checkpoints, milestones, and analytics dashboards."
          />
          <FaqItem
            question="Can I connect with other learners?"
            answer="Yes, Miles has a vibrant community feature where you can connect, discuss, and collaborate with fellow learners."
          />
        </div>
      </section>
    </div>
  );
};

const Feature = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-card rounded-lg shadow-lg"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <Card className="p-6">
    <div className="flex items-start space-x-4">
      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </Card>
);

const FaqItem = ({ question, answer }) => (
  <motion.div
    initial={false}
    className="border border-border rounded-lg p-4"
  >
    <h3 className="text-lg font-semibold mb-2">{question}</h3>
    <p className="text-muted-foreground">{answer}</p>
  </motion.div>
);

export default About;