import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  audioControllers: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 15,
  },
  audioCount: {
    fontSize: 14,
    textAlign: "right",
  },
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  audioSubTitle: {
    color: "#ADAAAA",
    fontSize: 16,
    marginBottom: 24,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    zIndex: -100,
  },
  controlRound: {
    alignItems: "center",
    backgroundColor: "#0A345F",
    borderRadius: 24,
    height: 46,
    justifyContent: "center",
    marginHorizontal: 10,
    width: 46,
  },
  controlWhite: {
    marginHorizontal: 10,
  },
  imgBgStyle: {
    alignItems: "center",
    bottom: 4,
    height: 108,
    justifyContent: "center",
    marginLeft: -8,
    marginRight: 4,
    paddingLeft: 10,
    paddingTop: 14,
    width: 108,
  },
  interface: {
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    width: "100%"
  },
  midBannerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  progressFromTo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  selected: { backgroundColor: "#fff", borderRadius: 2 },
  slider: {
    elevation: 5,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  track: { borderRadius: 2, height: 8, width: "100%" },
})

export default styles
