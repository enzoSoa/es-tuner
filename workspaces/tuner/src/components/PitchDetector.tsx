import {useEffect, useState} from "react";

export function PitchDetector() {
  const [frequencies, setFrequencies] = useState<number[]>([]);
  const [pitch, setPitch] = useState<number>(0);

  useEffect(() => {
    const analyseFrequencies = (data: Uint8Array, frequenciesResolution: number) => {
      const loudestIndex = data.reduce((prevIndex, currentValue, currentIndex) => {
        return currentValue > data[prevIndex] ? currentIndex : prevIndex;
      }, 0);

      setPitch(loudestIndex * frequenciesResolution);
    };

    const handleStream = (stream: MediaStream) => {
      const audioContext = new AudioContext({latencyHint: "playback", sampleRate: 96000});
      const sourceNode = audioContext.createMediaStreamSource(stream);

      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 32768
      sourceNode.connect(analyserNode);

      const frequencyResolution = audioContext.sampleRate / 2 / analyserNode.frequencyBinCount;
      const frequenciesData = new Uint8Array(analyserNode.frequencyBinCount);
      const getFrequencies = () => {
        analyserNode.getByteFrequencyData(frequenciesData);

        analyseFrequencies(frequenciesData, frequencyResolution);
        setFrequencies(Array.from(frequenciesData, frequency => Number(frequency)));

        requestAnimationFrame(getFrequencies);
      };
      requestAnimationFrame(getFrequencies);
    };
    const handleError = (error: Error) => {
      console.error('Error accessing microphone', error);
    };

    navigator.mediaDevices
      .getUserMedia({audio: true})
      .then(handleStream)
      .catch(handleError);

  }, []);

  return <section style={{display: "flex", flexDirection: "column", height: "100vh"}}>
    <h1>{pitch}</h1>
    <h2>{frequencies.length}</h2>
    <section style={{display: "flex", alignItems: "flex-start", height: "100%"}}>
      {frequencies.map(frequencyUnit => <div style={{
        height: frequencyUnit,
        background: "red",
        width: `calc(calc(100vw / ${frequencies.length * 0.001}) * 0.9)`
      }}></div>)}
    </section>
  </section>;
}