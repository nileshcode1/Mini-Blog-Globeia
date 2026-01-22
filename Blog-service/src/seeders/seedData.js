const mongoose = require('mongoose');
const User = require('../models/User');
const Blog = require('../models/Blog');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-blog');
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedUsers = [
  {
    email: 'john@example.com',
    password: 'password123'
  },
  {
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    email: 'mike@example.com',
    password: 'password123'
  },
  {
    email: 'sarah@example.com',
    password: 'password123'
  }
];

const seedBlogs = [
  {
    title: 'Getting Started with React',
    content: `React is a powerful JavaScript library for building user interfaces. In this blog post, we'll explore the fundamentals of React and how to get started with your first React application.

React was created by Facebook and has become one of the most popular frontend frameworks. It uses a component-based architecture that makes it easy to build reusable UI components.

Key features of React include:
- Virtual DOM for better performance
- Component-based architecture
- Unidirectional data flow
- JSX syntax for writing components
- Large ecosystem and community support

To get started with React, you'll need Node.js installed on your machine. Then you can use Create React App to quickly set up a new project.`
  },
  {
    title: 'Understanding JavaScript Closures',
    content: `Closures are one of the most important concepts in JavaScript. A closure is created when a function is defined inside another function and has access to the outer function's variables.

Here's a simple example:

function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

The inner function has access to the variable 'x' from the outer function, even after the outer function has finished executing.

Closures are useful for:
- Data privacy and encapsulation
- Creating function factories
- Implementing callbacks and event handlers
- Module patterns

Understanding closures will help you write better JavaScript code and understand how many JavaScript patterns work under the hood.`
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Which',
    content: `CSS Grid and Flexbox are both powerful layout systems in CSS, but they serve different purposes and excel in different scenarios.

Flexbox is designed for one-dimensional layouts - either rows or columns. It's perfect for:
- Navigation bars
- Centering content
- Distributing space between items
- Aligning items in a container

CSS Grid is designed for two-dimensional layouts - both rows and columns simultaneously. It's ideal for:
- Complex page layouts
- Card-based designs
- Magazine-style layouts
- Any layout that requires precise control over both dimensions

In many cases, you'll use both together. Grid for the overall page layout and Flexbox for component-level layouts.

The key is understanding that they complement each other rather than compete with each other.`
  },
  {
    title: 'Node.js Best Practices for 2024',
    content: `Node.js continues to be a popular choice for backend development. Here are some best practices to follow when building Node.js applications in 2024.

1. Use the latest LTS version of Node.js
2. Structure your project properly with separate folders for routes, controllers, models, and middleware
3. Use environment variables for configuration
4. Implement proper error handling
5. Use async/await instead of callbacks
6. Validate input data
7. Implement logging
8. Use a process manager like PM2 for production
9. Monitor your application performance
10. Keep dependencies up to date

Security is also crucial:
- Use HTTPS
- Validate and sanitize input
- Use helmet.js for security headers
- Implement rate limiting
- Keep dependencies updated

Following these practices will help you build robust and maintainable Node.js applications.`
  },
  {
    title: 'MongoDB vs PostgreSQL: Choosing the Right Database',
    content: `Choosing between MongoDB and PostgreSQL depends on your specific use case and requirements. Both are excellent databases but serve different purposes.

MongoDB is a NoSQL document database that's great for:
- Rapid prototyping
- Applications with evolving schemas
- Handling unstructured data
- Horizontal scaling
- Real-time applications

PostgreSQL is a relational database that excels at:
- Complex queries and transactions
- Data integrity and consistency
- Structured data with relationships
- Advanced SQL features
- ACID compliance

Consider MongoDB when:
- You need flexible schema design
- You're working with JSON-like data
- You need to scale horizontally
- You're building content management systems

Consider PostgreSQL when:
- You need strong consistency
- You have complex relationships between data
- You need advanced querying capabilities
- You're building financial or e-commerce applications

The choice ultimately depends on your specific requirements, team expertise, and long-term goals.`
  },
  {
    title: 'Building RESTful APIs with Express.js',
    content: `Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building APIs.

Here's how to build a RESTful API with Express:

1. Set up your project structure
2. Install necessary dependencies
3. Create your Express app
4. Define your routes
5. Implement middleware
6. Add error handling
7. Test your API

Key principles of RESTful APIs:
- Use HTTP methods appropriately (GET, POST, PUT, DELETE)
- Use meaningful URLs
- Return appropriate status codes
- Use JSON for data exchange
- Implement proper error handling

Middleware is crucial in Express:
- Authentication middleware
- Logging middleware
- Error handling middleware
- CORS middleware

Testing your API is important. Use tools like Postman or write automated tests with Jest and Supertest.

Following REST principles will make your API predictable and easy to use for frontend developers and other consumers.`
  },
  {
    title: 'Frontend Performance Optimization Tips',
    content: `Frontend performance is crucial for user experience and SEO. Here are some key optimization techniques:

1. Minimize HTTP requests
2. Optimize images (use WebP, lazy loading)
3. Minify CSS and JavaScript
4. Use a Content Delivery Network (CDN)
5. Enable gzip compression
6. Optimize critical rendering path
7. Use browser caching
8. Reduce DOM manipulation
9. Use efficient CSS selectors
10. Implement code splitting

Image optimization is particularly important:
- Use appropriate formats (WebP for modern browsers)
- Compress images without losing quality
- Use responsive images
- Implement lazy loading

JavaScript optimization:
- Remove unused code
- Use tree shaking
- Implement code splitting
- Use async/defer for script loading

CSS optimization:
- Remove unused CSS
- Use efficient selectors
- Minimize reflows and repaints

Tools for measuring performance:
- Lighthouse
- WebPageTest
- Chrome DevTools
- GTmetrix

Regular performance audits will help you maintain fast loading times and good user experience.`
  },
  {
    title: 'Introduction to TypeScript',
    content: `TypeScript is a superset of JavaScript that adds static type checking. It's become increasingly popular for building large-scale applications.

Benefits of TypeScript:
- Catch errors at compile time
- Better IDE support with autocomplete
- Improved code documentation
- Easier refactoring
- Better team collaboration

Basic TypeScript features:
- Type annotations
- Interfaces
- Classes
- Generics
- Modules
- Decorators

Getting started with TypeScript:
1. Install TypeScript globally or in your project
2. Create a tsconfig.json file
3. Start writing .ts files
4. Compile to JavaScript

TypeScript with React:
- Better component props typing
- Improved event handling
- Better state management
- Enhanced developer experience

TypeScript with Node.js:
- Type-safe API development
- Better error handling
- Improved maintainability
- Enhanced debugging

While there's a learning curve, TypeScript pays dividends in larger projects by catching errors early and improving code quality.`
  },
  {
    title: 'Modern CSS Features You Should Know',
    content: `CSS has evolved significantly in recent years. Here are some modern features that can improve your styling workflow:

CSS Grid and Flexbox:
- Grid for two-dimensional layouts
- Flexbox for one-dimensional layouts
- Both provide powerful alignment options

CSS Custom Properties (Variables):
- Define reusable values
- Dynamic theming
- Better maintainability

CSS Container Queries:
- Responsive design based on container size
- More flexible than media queries
- Better component-based styling

CSS Logical Properties:
- Writing-mode independent properties
- Better internationalization support
- More semantic property names

Modern Selectors:
- :has() pseudo-class
- :is() and :where() pseudo-classes
- :focus-visible for better accessibility

CSS Functions:
- clamp() for responsive typography
- min() and max() for flexible sizing
- calc() for dynamic calculations

CSS Subgrid:
- Inherit grid lines from parent
- Better alignment across nested grids
- More flexible grid layouts

These features can help you write more maintainable and flexible CSS code.`
  },
  {
    title: 'Web Security Best Practices',
    content: `Web security is crucial for protecting your applications and users. Here are essential security practices every developer should follow:

Authentication and Authorization:
- Use strong password policies
- Implement multi-factor authentication
- Use secure session management
- Implement proper access controls

Input Validation:
- Validate all user input
- Sanitize data before processing
- Use parameterized queries to prevent SQL injection
- Validate file uploads

HTTPS and Encryption:
- Always use HTTPS in production
- Use strong encryption algorithms
- Implement proper certificate management
- Use HSTS headers

Common Vulnerabilities to Prevent:
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- SQL Injection
- Insecure Direct Object References

Security Headers:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

Regular Security Practices:
- Keep dependencies updated
- Regular security audits
- Implement logging and monitoring
- Use security scanning tools
- Follow the principle of least privilege

Security is not a one-time implementation but an ongoing process that requires constant attention and updates.`
  },
  {
    title: 'Getting Started with Docker',
    content: `Docker is a containerization platform that allows you to package applications and their dependencies into lightweight, portable containers.

Why use Docker?
- Consistent environments across development, testing, and production
- Easy application deployment
- Scalability and resource efficiency
- Isolation between applications
- Simplified dependency management

Key Docker concepts:
- Images: Read-only templates for creating containers
- Containers: Running instances of images
- Dockerfile: Instructions for building images
- Docker Compose: Tool for defining multi-container applications

Basic Docker commands:
- docker build: Build an image from Dockerfile
- docker run: Create and start a container
- docker ps: List running containers
- docker stop: Stop a running container
- docker pull: Download an image from registry

Creating a Dockerfile:
1. Choose a base image
2. Set working directory
3. Copy application files
4. Install dependencies
5. Expose ports
6. Define startup command

Docker Compose for multi-container apps:
- Define services in docker-compose.yml
- Manage multiple containers together
- Easy networking between containers
- Volume management

Docker is essential for modern application deployment and development workflows.`
  },
  {
    title: 'Understanding Async/Await in JavaScript',
    content: `Async/await is a modern way to handle asynchronous operations in JavaScript. It makes asynchronous code look and behave more like synchronous code.

Before async/await, we used callbacks and promises:

// Callback hell
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // ... callback hell
    });
  });
});

// Promises
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => {
    // handle result
  });

With async/await:
async function fetchData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getEvenMoreData(b);
    return c;
  } catch (error) {
    console.error(error);
  }
}

Benefits of async/await:
- More readable code
- Better error handling with try/catch
- Easier debugging
- No callback hell
- Familiar synchronous-like syntax

Best practices:
- Always use try/catch for error handling
- Don't forget to await async functions
- Use Promise.all() for concurrent operations
- Handle errors appropriately

Async/await has become the preferred way to handle asynchronous operations in modern JavaScript.`
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await User.deleteMany({});
    await Blog.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.email}`);
    }

    // Create blogs
    let blogCount = 0;
    for (const blogData of seedBlogs) {
      // Assign random author to each blog
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      
      const blog = new Blog({
        ...blogData,
        author: randomUser._id
      });
      
      await blog.save();
      blogCount++;
      console.log(`✅ Created blog: ${blog.title}`);
    }

    console.log(`\n🎉 Seeding completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   - Users created: ${createdUsers.length}`);
    console.log(`   - Blogs created: ${blogCount}`);
    console.log(`\n👥 Test Users (all with password: password123):`);
    createdUsers.forEach(user => {
      console.log(`   - ${user.email}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

// Run the seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
};

// Check if this file is being run directly
if (require.main === module) {
  runSeeder();
}

module.exports = { seedDatabase, runSeeder };