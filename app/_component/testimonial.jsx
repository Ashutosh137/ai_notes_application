import { Star } from "lucide-react";

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Graduate Student",
      content:
        "This app has completely transformed how I study research papers. I can extract key concepts in minutes instead of hours, and the AI summaries are incredibly accurate.",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_rNwmL7IqTLuiTNWTM27a55dabjf1GpB14g&s",
    },
    {
      name: "Michael Chen",
      role: "Research Analyst",
      content:
        "The smart search functionality is a game-changer. I can find exactly what I need across hundreds of PDFs instantly. This tool has easily saved me 10+ hours per week.",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhYYwMilX6sLpjy1R4qIcJESe-zz2MdQEp7A&s",
    },
    {
      name: "Emily Rodriguez",
      role: "Professor",
      content:
        "I use this with my students to help them better understand complex academic papers. The AI summaries break down difficult concepts in a way that's accessible without oversimplifying.",
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s",
    },
  ];

  return (
    <div className="relative py-20 bg-white dark:bg-gray-800" id="testimonials">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-10"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>

      <div className="relative container mx-auto  px-10 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            What Our <span className="text-red-500">Users</span> Are Saying
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our AI-powered PDF tool is helping students,
            researchers, and professionals save time and gain deeper insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TestimonialSection;
