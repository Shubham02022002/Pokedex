import { DetailedPokemon } from "@/types";
import { colorByTypes } from "@/utils/colorsByTypes";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Details = () => {
  const [pokemonDetails, setPokemonDetails] = useState<DetailedPokemon | null>(
    null,
  );

  const params = useLocalSearchParams();
  const primaryType = pokemonDetails?.types[0]?.type.name ?? "normal";
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    if (name) {
      getPokemonDetailsByName(name);
    }
  }, [name]);

  const getPokemonDetailsByName = async (pokemonName: string) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );

      const details = response.data;

      const pokeDetails: DetailedPokemon = {
        name: details.forms[0].name,
        frontShinyImgURL: details.sprites.front_shiny,
        backShinyImgURL: details.sprites.back_shiny,
        types: details.types,
      };

      setPokemonDetails(pokeDetails);
    } catch (e) {
      console.log("Error fetching Pokémon details:", e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: pokemonDetails?.name,
        }}
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colorByTypes[primaryType] ?? "#666",
        }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            {pokemonDetails?.name.toUpperCase()}
          </Text>

          <Image
            source={{
              uri: pokemonDetails?.frontShinyImgURL,
            }}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Pokémon Types</Text>

          <View style={styles.typesRow}>
            {pokemonDetails?.types.map((type) => (
              <View key={type.type.name} style={styles.typeChip}>
                <Text style={styles.typeText}>{type.type.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Sprites</Text>

          <View style={styles.spriteContainer}>
            <Image
              source={{
                uri: pokemonDetails?.frontShinyImgURL,
              }}
              style={styles.sprite}
            />

            <Image
              source={{
                uri: pokemonDetails?.backShinyImgURL,
              }}
              style={styles.sprite}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  hero: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },

  heroTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "900",
  },

  heroImage: {
    width: 220,
    height: 220,
  },

  contentCard: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    minHeight: 500,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },

  typesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 30,
  },

  typeChip: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  typeText: {
    fontWeight: "700",
  },

  spriteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  sprite: {
    width: 140,
    height: 140,
  },
});
