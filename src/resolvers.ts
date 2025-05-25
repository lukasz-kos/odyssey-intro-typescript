import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    // popularPlanets: (_, __, { dataSources }) => {
    //   return dataSources.planetService.getPopularPlanets();
    // },
    listing: (_, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
};
