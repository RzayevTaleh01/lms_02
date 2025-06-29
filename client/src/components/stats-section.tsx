export default function StatsSection() {
  const stats = [
    {
      number: "10,000+",
      label: "Students Enrolled",
      description: "Active learners from around the world"
    },
    {
      number: "50+",
      label: "Expert Instructors",
      description: "Industry professionals and educators"
    },
    {
      number: "200+",
      label: "Courses Available",
      description: "Comprehensive programming curriculum"
    },
    {
      number: "95%",
      label: "Completion Rate",
      description: "High success rate for our students"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="text-3xl md:text-4xl font-bold text-devcode-orange mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-devcode-dark font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-devcode-gray">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
