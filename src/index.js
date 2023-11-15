import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = 3310;
const BASE_API = "https://kaamelott.chaudie.re/api";

const app = express();

/**
 * CORS
 */
app.use(cors());

/**
 * Fetch all data
 */
app.get("/api/all", async (req, res) => {
	try {
		const response = await axios.get(BASE_API + "/all");
		res.status(200).send(response.data);
	} catch (error) {
		return res.sendStatus(500);
	}
});

/**
 * Fetch random data
 */

app.get("/api/random", async (req, res) => {
	try {
		const response = await axios.get(BASE_API + "/random");
		res.status(200).send(response.data);
	} catch (error) {
		res.sendStatus(500);
	}
});

/**
 * Fetch img
 */

app.get("/api/personnage/:personnage/pic", async (req, res) => {
	try {
		const response = await axios.get(
			BASE_API + `/personnage/${req.params.personnage}/pic`,
			{
				responseType: "arraybuffer",
			}
		);

		const img = Buffer.from(response.data, "binary");

		res.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": img.length,
		});

		res.end(img, "binary");
	} catch (error) {
		if (error.response) {
			// La requête a été faite et le serveur a répondu avec un code d'état
			console.error("Error response from server:", error.response.data);
			res.status(error.response.status).send("Server Error");
		} else if (error.request) {
			// La requête a été faite mais aucune réponse n'a été reçue
			console.error("No response received from server");
			res.sendStatus(500);
		} else {
			// Une erreur s'est produite lors de la configuration de la requête
			console.error("Request setup error:", error.message);
			res.sendStatus(500);
		}
	}
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Server failed to start:", err);
	} else {
		console.log(`Server is listening on ${PORT}`);
	}
});
