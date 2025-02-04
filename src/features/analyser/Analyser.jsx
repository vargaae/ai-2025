import React, { useState } from "react";
import axios from "axios";

const Analyzer = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!imageUrl) {
      setError("Adj meg egy érvényes kép URL-t!");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysisResult([]);

    try {
      const response = await axios.post("https://your-fastapi-backend.onrender.com/analyze-image/", {
        image_url: imageUrl
      });

      // Kivesszük a PREDICTED CONCEPT-eket a válaszból
      const concepts = response.data?.outputs?.[0]?.data?.concepts || [];
      setAnalysisResult(concepts);
    } catch (err) {
      setError("Hiba történt az elemzés során.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold">Képanalízis a Clarifai API-val</h2>

      <input
        type="text"
        className="w-full p-2 border rounded text-black"
        placeholder="Kép URL megadása..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Elemzés folyamatban..." : "Elemzés indítása"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {analysisResult.length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold">Predicted Concepts:</h3>
          <ul className="list-disc pl-5">
            {analysisResult.map((concept) => (
              <li key={concept.id} className="text-sm">
                {concept.name} ({(concept.value * 100).toFixed(2)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
