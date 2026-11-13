// An SVG file imported in code arrives as its text, by the ".svg" loader
// set in angular.json
declare module '*.svg' {
  const text: string;
  export default text;
}
