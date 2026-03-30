import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { graphql } from 'graphql';
import { buildSchema } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();
const PORT = process.env.PORT || 3000;

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// GraphQL Schema
const schema = buildSchema(`
  type BusArrivalInfo {
    arrmsg1: String
    rtNm: String
    vehId1: String
    firstTm: String
    lastTm: String
    term: String
    stId: String
  }

  type GyeonggiBusArrivalInfo {
    routeName: String
    predictTime1: String
    locationNo1: String
    stationNm1: String
  }
    
  type GyeonggiBusRouteInfo {
    routeName: String
    upFirstTime: String
    upLastTime: String
    peekAlloc: String
    nPeekAlloc: String
    satPeekAlloc: String
    satNPeekAlloc: String
    sunPeekAlloc: String
    sunNPeekAlloc: String
    wePeekAlloc: String
    weNPeekAlloc: String
  }

  type SeoulMsgHeader {
    headerCd: String
    headerMsg: String
    itemCount: String
  }

  type SeoulMsgBody {
    itemList: [BusArrivalInfo]
  }

  type SeoulResponse {
    msgHeader: SeoulMsgHeader
    msgBody: SeoulMsgBody
  }

  type SeoulBusResponse {
    response: SeoulResponse
  }

  type GyeonggiHeader {
    resultCode: String
    resultMsg: String
  }

  type GyeonggiBody {
    busArrivalList: [GyeonggiBusArrivalInfo]
  }

  type GyeonggiBusResponse {
    response: GyeonggiResponse
  }

  type GyeonggiResponse {
    msgHeader: GyeonggiHeader
    msgBody: GyeonggiBody
  }
  type GyeonggiRouteBody {
    busRouteInfoItem: GyeonggiBusRouteInfo
  }

  type GyeonggiRouteResponse {
    response: GyeonggiRouteResponseData
  }

  type GyeonggiRouteResponseData {
    msgHeader: GyeonggiHeader
    msgBody: GyeonggiRouteBody
  }

  type Query {
    hello: String
    seoulBusArrival(routeId: Int!): SeoulBusResponse
    gyeonggiBusArrival(stationId: Int!): GyeonggiBusResponse
    gyeonggiBusRoute(routeId: Int!): GyeonggiRouteResponse
    busArrival(routeId: Int!): String
  }

  type Mutation {
    setMessage(message: String!): String
  }
`);

// GraphQL Resolvers
const root = {  
  seoulBusArrival: async ({ routeId }) => {
    try {
      const apiKey = process.env.USER;
      const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${apiKey}&busRouteId=${routeId}`;
      const response = await fetch(url);
      const xmlData = await response.text();
      const jsonData = xmlToJson(xmlData);
      console.log('Fetched Seoul bus data:', jsonData.msgBody.itemList[0]);
      // Transform XML data to match GraphQL schema
      return {
        response: {
          msgBody: {
            itemList: jsonData.msgBody?.itemList?.map(item => {
              console.log(item)
              return ({
              arrmsg1: item.arrmsg1 || '',
              rtNm: item.rtNm || '',
              vehId1: item.vehId1 || '',
              firstTm: item.firstTm || '',
              lastTm: item.lastTm || '',
              term: item.term || '',
              stId: item.stId || ''
            })}) || []
          }
        }
      };
    } catch (error) {
      console.error('Error fetching Seoul bus data:', error);
      return {
        response: {
          msgHeader: {
            headerCd: 'ERROR',
            headerMsg: 'Error fetching Seoul bus data',
            itemCount: '0'
          },
          msgBody: {
            itemList: []
          }
        }
      };
    }
  },

  gyeonggiBusArrival: async ({ stationId }) => {
    try {
      const apiKey = process.env.USER;
      const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${apiKey}&stationId=${stationId}&format=json`;
      const data = await fetch(url);
      const res = await data.json();
      // console.log('Fetched Gyeonggi bus data:', stationId);
      // console.log('Fetched Gyeonggi bus data:', res.response.msgBody.busArrivalList);
      return res;
    } catch (error) {
      console.error('Error fetching Gyeonggi bus arrival data:', error);
      return {
        response: {
          header: {
            resultCode: 'ERROR',
            resultMsg: 'Error fetching Gyeonggi bus arrival data'
          },
          body: {
            items: {
              item: []
            }
          }
        }
      };
    }
  },

  gyeonggiBusRoute: async ({ routeId }) => {
    console.log(routeId)
    try {
      const apiKey = process.env.USER;
      const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=${apiKey}&routeId=${routeId}&format=json`;
      const response = await fetch(url);
      const apiData = await response.json();
      console.log(apiData)
      // Transform API data to match GraphQL schema
      // const pass = {
      //   response: {
      //     msgBody: {
      //       busRouteInfoItem: {
      //         routeName: apiData?.response?.msgBody?.busRouteInfoItem?.routeName || ''
      //       }
      //     }
      //   }
      // };
      // console.log(pass.response.msgBody.busRouteInfoItem.routeName)
      return apiData
    } catch (error) {
      console.error('Error fetching Gyeonggi bus route data:', error);
      return {
        response: {
          msgHeader: {
            resultCode: 'ERROR',
            resultMsg: 'Error fetching Gyeonggi bus route data'
          },
          msgBody: {
            busRouteInfoItem: []
          }
        }
      };
    }
  },

  busArrival: async ({ routeId }) => {
    try {
      const apiKey = process.env.USER;
      const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${apiKey}&stationId=${id}&format=json`;
      const response = await fetch(url);
      const data = await response.text();
      return data;
    } catch (error) {
      console.error('Error fetching bus data:', error);
      return 'Error fetching bus data';
    }
  },

  setMessage: ({ message }) => {
    return message;
  }
};
// GraphQL endpoint
app.post('/graphql', async (c) => {
  try {
    const body = await c.req.json();
    const result = await graphql({
      schema,
      source: body.query,
      rootValue: root,
      variableValues: body.variables,
    });
    return c.json(result);
  } catch (error) {
    return c.json({ errors: [error.message] }, 400);
  }
});

// GraphiQL interface
app.get('/graphql', (c) => {
  const graphiqlHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphiQL</title>
        <style>
          body { height: 100%; margin: 0; width: 100%; overflow: hidden; }
          #graphiql { height: 100vh; }
        </style>
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/graphiql/graphiql.min.css" />
      </head>
      <body>
        <div id="graphiql">Loading...</div>
        <script src="https://unpkg.com/graphiql/graphiql.min.js" type="application/javascript"></script>
        <script>
          const graphQLFetcher = graphQLParams =>
            fetch('/graphql', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(graphQLParams),
            })
              .then(response => response.json())
              .catch(() => response.text());

          ReactDOM.render(
            React.createElement(GraphiQL, {
              fetcher: graphQLFetcher,
              defaultQuery: \`{
                hello
                seoulBusArrival(routeId: 100100118) {
                  response {
                    msgHeader {
                      headerCd
                      headerMsg
                      itemCount
                    }
                    msgBody {
                      itemList {
                        arrmsg1
                        rtNm
                        vehId1
                        firstTm
                        lastTm
                        term
                        stId
                      }
                    }
                  }
                }
              }\`,
            }),
            document.getElementById('graphiql'),
          );
        </script>
      </body>
    </html>
  `;
  return c.html(graphiqlHtml);
});

// XML to JSON conversion function using built-in methods
function xmlToJson(xmlString) {
  // Simple XML to JSON parser using regex and string manipulation
  function parseElement(xml) {
    const result = {};
    
    // Remove XML declaration and comments
    xml = xml.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
    
    // Extract attributes from opening tag
    const attrMatch = xml.match(/<(\w+)([^>]*?)>/);
    if (!attrMatch) return xml.trim();
    
    const tagName = attrMatch[1];
    const attributes = attrMatch[2];
    
    // Parse attributes
    if (attributes.trim()) {
      const attrs = {};
      const attrRegex = /(\w+)="([^"]*)"/g;
      let match;
      while ((match = attrRegex.exec(attributes)) !== null) {
        attrs[match[1]] = match[2];
      }
      if (Object.keys(attrs).length > 0) {
        result['@attributes'] = attrs;
      }
    }
    
    // Extract content between opening and closing tags
    const contentMatch = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`));
    if (!contentMatch) {
      // Self-closing tag or empty
      return result;
    }
    
    let content = contentMatch[1].trim();
    
    // Check if content contains child elements
    if (content.includes('<')) {
      // Parse child elements
      const childElements = {};
      const tagRegex = /<(\w+)([^>]*?)>([\s\S]*?)<\/\1>/g;
      let match;
      
      while ((match = tagRegex.exec(content)) !== null) {
        const childTag = match[1];
        const childContent = match[3];
        const parsedChild = parseElement(`<${childTag}${match[2]}>${childContent}</${childTag}>`);
        
        if (childElements[childTag]) {
          if (!Array.isArray(childElements[childTag])) {
            childElements[childTag] = [childElements[childTag]];
          }
          childElements[childTag].push(parsedChild);
        } else {
          childElements[childTag] = parsedChild;
        }
      }
      
      Object.assign(result, childElements);
    } else if (content) {
      // Text content only
      return content;
    }
    
    return result;
  }
  
  return parseElement(xmlString);
}

// Routes
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Hono API with GraphQL',
    version: '1.0.0',
    status: 'running'
  });
});

app.get(`/bus/:id`, async (c) => {
  try {
    const apiKey = process.env.USER;
    const id = c.req.param('id');
    const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${apiKey}&busRouteId=${id}`;
    const data = await fetch(url);
    const xmlData = await data.text();
    
    // Convert XML to JSON using built-in methods
    const res = xmlToJson(xmlData);
    return c.json({response: res});
  } catch (error) {
    console.error(error);
    return c.text('Error fetching bus data', 500);
  }
});
app.get(`/seArrival/:id`, async (c) => {
  try {
    const apiKey = process.env.USER;
    const id = c.req.param('id');
    const url = `http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=${apiKey}&busRouteId=${id}`;
    const data = await fetch(url);
    const xmlData = await data.text();
    const res = xmlToJson(xmlData);
    return c.json({response: res});
  } catch (error) {
    console.error(error);
    return c.text('Error fetching bus data', 500);
  }
});
app.get(`/gyArrival/:id`, async (c) => {
  try {
    const apiKey = process.env.USER;
    const id = c.req.param('id');
    const url = `https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${apiKey}&stationId=${id}&format=json`;
    const data = await fetch(url);
    const res = await data.json();
    return c.json(res);
  } catch (error) {
    console.error(error);
    return c.text('Error fetching bus data', 500);
  }
});
app.get(`/gyRoute/:id`, async (c) => {
  try {
    const apiKey = process.env.USER;
    const id = c.req.param('id');
    const url = `https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=${apiKey}&routeId=${id}&format=json`;
    const data = await fetch(url);
    const res = await data.json();
    return c.json(res);
  } catch (error) {
    console.error(error);
    return c.text('Error fetching bus data', 500);
  }
});

app.get('/api/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.onError((err, c) => {
  console.error(err.stack);
  return c.json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  }, 404);
});

// Start server
console.log(`Server is running on port ${PORT}`);
console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
console.log(`Health check available at http://localhost:${PORT}/api/health`);

serve({
  fetch: app.fetch,
  port: PORT,
});

export default app;
