export default function PlaceOne() {
  return (
    <div className="flex items-center justify-center min-h-screen pb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Place One</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This is the first place in your navigation dock.
        </p>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Choose your ride to visit Place Two:</h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="/process?vehicle=car&destination=Place Two&from=Place One"
              className="flex flex-col items-center p-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-medium">회기역-경희대 01번</span>
            </a>
            <a
              href="/process?vehicle=train&destination=Place Two&from=Place One"
              className="flex flex-col items-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span className="font-medium">회기역-외대앞역 02번</span>
            </a>
            <a
              href="/process?vehicle=plane&destination=Place Two&from=Place One"
              className="flex flex-col items-center p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <span className="font-medium">자율주행 A01번</span>
            </a>
            <a
              href="/process?vehicle=ship&destination=Place Two&from=Place One"
              className="flex flex-col items-center p-6 bg-purple-100 dark:bg-purple-900/30 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
              <span className="font-medium">캠퍼스 셔틀버스</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
