import { Movie } from "@/interfaces/interfaces";
// 1. Import TablesDB instead of Databases
import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
// 2. Terminology: Collections are now Tables
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// 3. Initialize TablesDB
const tablesDB = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // 4. Use listRows instead of listDocuments
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", query), // Example query usage
    ]);
    // Logic for incrementing or creating a new record follows...
    if (result.total > 0) {
      // Use tablesDB.incrementRowColumn or tablesDB.updateRow
      const exisitngMovie = result.rows[0];

      await tablesDB.incrementRowColumn(
        DATABASE_ID,
        TABLE_ID,
        exisitngMovie.$id,
        "count",
        1,
      );
    } else {
      // Use tablesDB.createRow
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update search count");
  }
};
