import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/testimonials', () => {
    return HttpResponse.json([
      {
        id: "1",
        name: "Mocked User",
        role: "Test Role",
        text: "This is a mock testimonial for MSW tests.",
        avatar: "https://i.pravatar.cc/150",
      },
    ]);
  }),
  
  http.post('/api/contact', () => {
    return HttpResponse.json({ success: true });
  }),
];
