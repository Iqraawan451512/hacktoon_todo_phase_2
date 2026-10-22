export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 
               text-indigo-900 tracking-tight">
  Task<span className="text-indigo-500">Hub</span>
</h1>

          <p className="text-lg md:text-xl text-blue-900 max-w-2xl mx-auto mb-10">
            The simplest way to manage your tasks and boost productivity.
            Get started in seconds with our intuitive task management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/login"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md border border-blue-200 hover:bg-blue-50 transition-colors duration-300"
            >
              Create Account
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 transition-all duration-700 ease-out
         hover:shadow-2xl hover:-translate-y-2 animate-[fadeInUp_0.8s_ease-out]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 transition-colors duration-300 hover:text-blue-900 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Organize Tasks</h3>
              <p className="text-blue-900">Create and manage all your tasks in one place with ease.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 transition-colors duration-300 hover:text-blue-900 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Track Progress</h3>
              <p className="text-blue-900">Keep track of your progress with simple completion markers.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 transition-colors duration-300 hover:text-blue-900 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Save Time</h3>
              <p className="text-blue-900">Focus on what matters most with our distraction-free interface.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-900">
            Join thousands of users who have transformed their productivity
          </p>
        </div>
      </div>
    </div>
  );
}