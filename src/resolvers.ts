import { Resolvers } from "./types";
import { validateFullAmenities } from "./helpers";

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
  Listing: {
    amenities: ({ id, amenities }, _, { dataSources }) => {
      return validateFullAmenities(amenities)
        ? amenities
        : dataSources.listingAPI.getAmenities(id);
    },
  },
};
