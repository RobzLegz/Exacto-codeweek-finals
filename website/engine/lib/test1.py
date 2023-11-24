from pydub import AudioSegment
from pydub.generators import Sine

# Define a mapping of characters to frequencies (in Hz)
char_to_freq = {
    'A': 440.0,
    'B': 493.88,
    'C': 523.25,
    'D': 587.33,
    'E': 659.26,
    'F': 698.46,
    'G': 783.99,
    'H': 880.0,
    'I': 987.77,
    'J': 1046.50,
    'K': 1174.66,
    'L': 1318.51,
    'M': 1396.91,
    'N': 1567.98,
    'O': 1760.0,
    'P': 1975.53,
    'Q': 2093.00,
    'R': 2349.32,
    'S': 2637.02,
    'T': 2793.83,
    'U': 3135.96,
    'V': 3520.0,
    'W': 3951.07,
    'X': 4186.01,
    'Y': 4698.63,
    'Z': 5274.04,
    ' ': 0.0,  # Silence for space
}

def string_to_sound_byte(input_string, output_file_path, duration_ms=200, sample_rate=44100):
    # Create an empty audio segment
    audio = AudioSegment.silent()

    # Iterate through each character in the input string
    for char in input_string.upper():  # Convert to uppercase for simplicity
        if char in char_to_freq:
            frequency = char_to_freq[char]
            sine_wave = Sine(frequency).to_audio_segment(duration=duration_ms)
            audio += sine_wave
        else:
            # Add a short silence for characters not in the mapping
            silence = AudioSegment.silent(duration=duration_ms)
            audio += silence

    # Export the audio to a file
    audio.export(output_file_path, format="wav")

# Example usage:
input_string = "Hello world I am saying right now dawg"
output_file = "output_sound.wav"
string_to_sound_byte(input_string, output_file, duration_ms=200, sample_rate=44100)
