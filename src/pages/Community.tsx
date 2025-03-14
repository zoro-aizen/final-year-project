import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    content:
      'Just completed the Frontend Development roadmap! The React section was particularly helpful. Anyone else working on this path?',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    tags: ['frontend', 'react', 'webdev'],
  },
  {
    id: '2',
    author: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    },
    content:
      'Starting my journey with Machine Learning. Any recommendations for good resources besides the roadmap?',
    timestamp: '4 hours ago',
    likes: 15,
    comments: 12,
    tags: ['machinelearning', 'ai', 'python'],
  },
  // Add more mock posts as needed
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some content for your post.',
        variant: 'destructive',
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      tags: extractTags(newPost),
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast({
      title: 'Success',
      description: 'Your post has been created!',
    });
  };

  const extractTags = (content: string): string[] => {
    const tags = content.match(/#[\w]+/g);
    return tags ? tags.map((tag) => tag.slice(1)) : [];
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow learners, share your progress, and get help.
        </p>
      </div>

      <Card className="mb-8 p-4">
        <div className="mb-4">
          <textarea
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Share your thoughts or ask a question... Use #tags to categorize your post"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Use #tags to categorize your post
          </p>
          <Button onClick={handleCreatePost}>Post</Button>
        </div>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <Input
          className="max-w-xs"
          placeholder="Search posts..."
          type="search"
        />
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Latest
          </Button>
          <Button variant="outline" size="sm">
            Popular
          </Button>
          <Button variant="outline" size="sm">
            Following
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.author.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.timestamp}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <span className="sr-only">More options</span>
                {/* Add icon here */}
              </Button>
            </div>

            <p className="mb-4 whitespace-pre-wrap">{post.content}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-t pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
              >
                {/* Add like icon */}
                <span className="ml-2">{post.likes} Likes</span>
              </Button>
              <Button variant="ghost" size="sm">
                {/* Add comment icon */}
                <span className="ml-2">{post.comments} Comments</span>
              </Button>
              <Button variant="ghost" size="sm">
                {/* Add share icon */}
                Share
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
