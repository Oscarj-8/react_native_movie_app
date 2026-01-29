import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, Image, ScrollView, View, Text, FlatList } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  const { data: movies, loading, error, refetch, reset } = useFetch(
    () => getMovies({ query: "" })
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 p-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
          minHeight: "100%",
        }}
      >
        <Image source={icons.logo} className="w-10 h-10 mt-14 mb-5 mx-auto" />
        <View>
          <SearchBar
            onPress={() => {
              router.push("/search");
            }}
            placeholder="Search for a movie"
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            className="mt-10 self-center"
          />
        ) :
          error ? (
        <Text className="text-white text-center">
          <Text className="text-white text-center">
            Error: {error?.message}
          </Text>
        </Text>
      ) : movies ? (
        <View>
          <Text className="text-white text-lg mt-5 mb-3 font-bold">
           Latest Movies
          </Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="mt-2 pb-32"
            scrollEnabled={false} 
          />
        </View>
      ) : (
        <Text className="text-white text-center">
          No movies found
        </Text>
        )}
      </ScrollView>
    </View>
  );
}
