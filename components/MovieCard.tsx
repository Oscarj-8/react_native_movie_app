import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { Movie } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild key={Math.random()}>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/150",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
      <Text className="text-white text-sm font-bold text-center" numberOfLines={1}>{title}</Text>
      <View className="flex-row items-center justify-start  gap-x-1">
        <Image source={icons.star} className="w-4 h-4" />
        <Text className="text-white text-xs font-bold">
          {Math.round(vote_average / 2)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-light-100 text-xs font-bold">
          {release_date.split("-")[0]}
        </Text>
        <Text className="text-light-300 text-xs font-medium">Movie</Text>
      </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
