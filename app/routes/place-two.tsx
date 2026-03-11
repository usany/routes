export default function PlaceTwo() {
  return (
    <div className="flex items-center justify-center min-h-screen pb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Place Two</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This is the second place in your navigation dock.
        </p>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Choose your ride to visit Place One:</h2>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a
              href="/process?vehicle=bike&destination=Place One&from=Place Two"
              className="flex flex-col items-center p-6 bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span className="font-medium">외국어대학-사색의 광장</span>
            </a>
            <a
              href="/process?vehicle=bus&destination=Place One&from=Place Two"
              className="flex flex-col items-center p-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <span className="font-medium">사색의 광장-정문 건너편</span>
            </a>
            <a
              href="/process?vehicle=taxi&destination=Place One&from=Place Two"
              className="flex flex-col items-center p-6 bg-pink-100 dark:bg-pink-900/30 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="font-medium">캠퍼스 셔틀버스</span>
            </a>
            <a
              href="/process?vehicle=walking&destination=Place One&from=Place Two"
              className="flex flex-col items-center p-6 bg-teal-100 dark:bg-teal-900/30 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors"
            >
              <svg className="w-12 h-12 mb-2 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              {/* <span className="font-medium">Walking</span> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
