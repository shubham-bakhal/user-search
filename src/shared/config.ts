class AppUrls {
  baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
}

const appConstants = {
  urls: new AppUrls(),
};

export default appConstants;
