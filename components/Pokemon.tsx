import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  id?: number;
  name?: string;
  types?: { type: { name: string } }[];
  typeColor: string;
}

export const PokemonHeader = ({ id, name, types, typeColor }: HeaderProps) => (
  <View style={styles.headerSection}>
    <View>
      <Text style={styles.pokemonId}>#{String(id ?? 0).padStart(3, "0")}</Text>
      <Text style={styles.pokemonName}>{name}</Text>
    </View>
    <View style={styles.typesContainer}>
      {types?.map((t) => (
        <View
          key={t.type.name}
          style={[styles.typeBadge, { backgroundColor: typeColor + "15" }]}
        >
          <Text style={[styles.typeText, { color: typeColor }]}>
            {t.type.name}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

interface HeroProps {
  image?: string;
  typeColor: string;
}

export const PokemonHero = ({ image, typeColor }: HeroProps) => (
  <View style={styles.heroCard}>
    <View
      style={[
        styles.heroBackgroundCircle,
        { backgroundColor: typeColor + "10" },
      ]}
    />
    <Image
      source={{ uri: image }}
      style={styles.heroImage}
      resizeMode="contain"
    />
  </View>
);

interface MetricsProps {
  height?: number;
  weight?: number;
}

export const PokemonMetrics = ({ height, weight }: MetricsProps) => (
  <View style={styles.cardRow}>
    <View style={styles.metricCard}>
      <Text style={styles.cardLabel}>HEIGHT</Text>
      <Text style={styles.metricValue}>
        {height} <Text style={styles.unit}>m</Text>
      </Text>
    </View>
    <View style={styles.metricCard}>
      <Text style={styles.cardLabel}>WEIGHT</Text>
      <Text style={styles.metricValue}>
        {weight} <Text style={styles.unit}>kg</Text>
      </Text>
    </View>
  </View>
);

interface StatsProps {
  stats?: { name: string; value: number }[];
  typeColor: string;
}

export const PokemonStats = ({ stats, typeColor }: StatsProps) => (
  <View style={styles.mainCard}>
    <Text style={styles.cardHeading}>Base Statistics</Text>
    {stats?.slice(0, 4).map((stat) => (
      <View key={stat.name} style={styles.statLine}>
        <Text style={styles.statName}>{stat.name}</Text>
        <Text style={styles.statValue}>{stat.value}</Text>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              {
                backgroundColor: typeColor,
                width: `${Math.min((stat.value / 150) * 100, 100)}%`,
              },
            ]}
          />
        </View>
      </View>
    ))}
  </View>
);

interface SpritesProps {
  front?: string;
  back?: string;
}

export const PokemonSprites = ({ front, back }: SpritesProps) => (
  <View style={styles.mainCard}>
    <Text style={styles.cardHeading}>Shiny Showcase</Text>
    <View style={styles.spriteRow}>
      <View style={styles.spriteCardInner}>
        <Image
          source={{ uri: front }}
          style={styles.spriteImg}
          resizeMode="contain"
        />
        <Text style={styles.spriteLabel}>Front View</Text>
      </View>
      <View style={styles.spriteCardInner}>
        <Image
          source={{ uri: back }}
          style={styles.spriteImg}
          resizeMode="contain"
        />
        <Text style={styles.spriteLabel}>Back View</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  pokemonId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  pokemonName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    textTransform: "capitalize",
    letterSpacing: -0.5,
  },
  typesContainer: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 24,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  heroBackgroundCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  heroImage: {
    width: 200,
    height: 200,
  },
  cardRow: {
    flexDirection: "row",
    gap: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  unit: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  statLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  statName: {
    width: 80,
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    textTransform: "capitalize",
  },
  statValue: {
    width: 30,
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginRight: 10,
  },
  barBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  spriteRow: {
    flexDirection: "row",
    gap: 12,
  },
  spriteCardInner: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
  },
  spriteImg: {
    width: 80,
    height: 80,
  },
  spriteLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
    marginTop: 4,
  },
});
