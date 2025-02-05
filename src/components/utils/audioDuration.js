export const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);

    // When the metadata is loaded, get the duration
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
    };

    // Handle errors if the audio fails to load
    audio.onerror = (error) => {
      reject("Error loading audio: " + error.message);
    };
  });
};
