exports.seed = function(knex) {
  return knex('templates').del()
    .then(function () {
      return knex('templates').insert([
        {
          id: 1,
          name: 'E-commerce Dashboard',
          description: 'A modern dashboard template for e-commerce businesses with analytics, inventory management, and sales tracking.',
          thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
          category: 'Dashboard'
        },
        {
          id: 2,
          name: 'Portfolio Landing',
          description: 'Clean and minimalist portfolio landing page perfect for creative professionals and freelancers.',
          thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
          category: 'Landing'
        },
        {
          id: 3,
          name: 'SaaS Admin Panel',
          description: 'Complete admin panel template for SaaS applications with user management and billing features.',
          thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
          category: 'Admin'
        },
        {
          id: 4,
          name: 'Blog Template',
          description: 'Responsive blog template with clean typography and optimized reading experience.',
          thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop',
          category: 'Blog'
        },
        {
          id: 5,
          name: 'Real Estate Website',
          description: 'Professional real estate website template with property listings and search functionality.',
          thumbnail_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop',
          category: 'Business'
        },
        {
          id: 6,
          name: 'Restaurant Menu',
          description: 'Elegant restaurant website template with online menu and reservation system.',
          thumbnail_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop',
          category: 'Business'
        },
        {
          id: 7,
          name: 'Fitness App',
          description: 'Modern fitness tracking app template with workout plans and progress tracking.',
          thumbnail_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
          category: 'Mobile'
        },
        {
          id: 8,
          name: 'Education Platform',
          description: 'Comprehensive online learning platform template with course management and student tracking.',
          thumbnail_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
          category: 'Education'
        }
      ]);
    });
};
