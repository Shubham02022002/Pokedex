import { basePoke, DetailedPokemon } from "@/types";
import { colorByTypes } from "@/utils/colorsByTypes";
import axios from "axios";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [pokemonData, setPokemonData] = useState<DetailedPokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPokeData();
  }, []);

  const getPokeData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );

      const fetchedPokemon = await Promise.all(
        response.data.results.map(async (item: basePoke) => {
          const { data } = await axios.get(item.url);
          return {
            name: data.name,
            backShinyImgURL: data.sprites.back_shiny ?? "",
            frontShinyImgURL: data.sprites.front_shiny ?? "",
            types: data.types,
            highResImage:
              data.sprites.other["official-artwork"].front_default ||
              data.sprites.front_default,
          };
        }),
      );

      setPokemonData(fetchedPokemon);
    } catch (error) {
      console.log("Error fetching Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Catching Pokémon...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.appTitle}>Pokédex</Text>

      {pokemonData.map((poke) => {
        const primaryType = poke.types[0]?.type.name ?? "normal";
        const cardColor = colorByTypes[primaryType] ?? "#777";

        return (
          <Link
            key={poke.name}
            href={{
              pathname: "/details",
              params: { name: poke.name },
            }}
            asChild
          >
            <View style={[styles.card, { backgroundColor: cardColor }]}>
              <View style={styles.cardContent}>
                <View style={styles.infoColumn}>
                  <Text style={styles.cardName}>{poke.name}</Text>

                  <View style={styles.badgesRow}>
                    {poke.types.map((type) => (
                      <View key={type.type.name} style={styles.badge}>
                        <Text style={styles.badgeText}>{type.type.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <Image
                  source={{
                    uri: (poke as any).highResImage || poke.frontShinyImgURL,
                  }}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10131A",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10131A",
    gap: 12,
  },
  loadingText: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFF",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
  },
  cardName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "800",
    textTransform: "capitalize",
    letterSpacing: -0.5,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
    textTransform: "capitalize",
  },
  cardImage: {
    width: 100,
    height: 100,
  },
});
