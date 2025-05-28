import { RESTDataSource } from "@apollo/datasource-rest";
import DataLoader from "dataloader";
import {
  Amenity,
  CreateListingInput,
  CreateListingResponse,
  Listing,
} from "../types";

export class ListingAPI extends RESTDataSource {
  // data loader
  private batchAmenities = new DataLoader(
    async (listingIds): Promise<Amenity[][]> => {
      console.log("Making one batched call with ", listingIds);
      const amenitiesLists = await this.get<Amenity[][]>("amenities/listings", {
        params: {
          ids: listingIds.join(","),
        },
      });
      console.log(amenitiesLists);
      return amenitiesLists;
    }
  );
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  getFeaturedListings(): Promise<Listing[]> {
    return this.get<Listing[]>("featured-listings");
  }

  getListing(listingId: string): Promise<Listing> {
    return this.get<Listing>(`listings/${listingId}`);
  }

  getAmenities(listingId: string): Promise<Amenity[]> {
    // chain resolver solution
    // console.log("Making a follow-up call for amenities with ", listingId);
    // return this.get<Amenity[]>(`listings/${listingId}/amenities`);

    // data loader solution
    console.log("Passing listing ID to the data loader: ", listingId);
    return this.batchAmenities.load(listingId);
  }

  createListing(listing: CreateListingInput): Promise<Listing> {
    return this.post<Listing>(`listings`, {
      body: {
        listing,
      },
    });
  }
}
