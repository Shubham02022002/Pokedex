import { EnhancedPokemon } from "@/types";
import { colorByTypes } from "@/utils/colorsByTypes";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  PokemonHeader,
  PokemonHero,
  PokemonMetrics,
  PokemonSprites,
  PokemonStats,
} from "../components/Pokemon";

const Details = () => {
  const [pokemon, setPokemon] = useState<EnhancedPokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useLocalSearchParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    if (name) {
      getPokemonDetailsByName(name);
    }
  }, [name]);

  const getPokemonDetailsByName = async (pokemonName: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const details = response.data;

      const mappedStats = details.stats.map((s: any) => ({
        name: s.stat.name.replace("special-", "Sp. "),
        value: s.base_stat,
      }));

      setPokemon({
        id: details.id,
        name: details.name,
        frontShinyImgURL: details.sprites.front_shiny,
        backShinyImgURL: details.sprites.back_shiny,
        types: details.types,
        height: details.height / 10,
        weight: details.weight / 10,
        highResImage:
          details.sprites.other["official-artwork"].front_default ||
          details.sprites.front_default,
        stats: mappedStats,
      });
    } catch (e) {
      console.log("Error fetching Pokémon details:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const primaryType = pokemon?.types[0]?.type.name ?? "normal";
  const typeColor = colorByTypes[primaryType] ?? "#666";

  if (isLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: "#F8F9FA" }]}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "#111827",
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PokemonHeader
          id={pokemon?.id}
          name={pokemon?.name}
          types={pokemon?.types}
          typeColor={typeColor}
        />
        <PokemonHero image={pokemon?.highResImage} typeColor={typeColor} />

        <View style={styles.dashboardGrid}>
          <PokemonMetrics height={pokemon?.height} weight={pokemon?.weight} />
          <PokemonStats stats={pokemon?.stats} typeColor={typeColor} />
          <PokemonSprites
            front={pokemon?.frontShinyImgURL}
            back={pokemon?.backShinyImgURL}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  dashboardGrid: {
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 16,
  },
});
