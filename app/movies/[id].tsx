import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { fethcMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  lable: string;
  value: string | number;
}

const MovieInfo = ({ lable, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{lable}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fethcMovieDetails(id as string));

  if (!movie) {
    return null;
  }
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[420px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 rounded-md px-2 py-1 gap-x-1  rounded-md mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)}
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo lable={"Overview"} value={movie?.overview || ""} />
          <MovieInfo
            lable={"Genere"}
            value={movie?.genres.map((g) => g.name).join(" - ") || ""}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              lable="Budget"
              value={`$${movie.budget / 1_000_000} million`}
            />
            <MovieInfo
              lable="Revenue"
              value={`$${Math.round(movie.revenue) / 1_000_000}`}
            />
          </View>
          <MovieInfo
            lable="Production Companies"
            value={`${movie.production_companies.map((c) => c.name).join(", ") || ""}`}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
          resizeMode="stretch"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
