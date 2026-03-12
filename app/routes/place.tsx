export default function Place() {
  return (
    <div className="flex items-center justify-center min-h-screen pb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">경희대 광릉캠</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          어디로 떠나볼까요?
        </p>
        <div className="space-y-6">
          {/* <h2 className="text-2xl font-semibold mb-6">Choose your destination:</h2> */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="/place-one"
              className="flex flex-col items-center p-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="font-medium">봉선사입구-내산정 방면</span>
            </a>
            <a
              href="/place-two"
              className="flex flex-col items-center p-6 bg-green-100 dark:bg-green-900/30 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span className="font-medium">봉선사입구-종점 방면</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
