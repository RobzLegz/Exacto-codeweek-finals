from pydub import AudioSegment
from pydub.generators import Sine
import random

chars = {
    'A': 164.81,
    'B': 196.00,
    'C': 220.00,
    'D': 246.94,
    'E': 293.66,
    'F': 329.63,
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

char_to_freq = {k:random.randrange(300, 900) for k in chars.keys()}

def string_to_sound_byte(input_string, output_file_path, duration_ms=200, sample_rate=44100):
    # Create an empty audio segment
    audio = AudioSegment.silent()

    # Iterate through each character in the input string
    for char in input_string.upper():  # Convert to uppercase for simplicity
        if char in char_to_freq:
            frequency = char_to_freq[char] / 3
            sine_wave = Sine(frequency).to_audio_segment(duration=duration_ms)
            audio += sine_wave
        else:
            # Add a short silence for characters not in the mapping
            silence = AudioSegment.silent(duration=duration_ms)
            audio += silence

    # Export the audio to a file
    audio.export(output_file_path, format="wav")

# Example usage:
input_string = "Es seit bakstu savu dandali man ir lubrikants uz mana krana es tikai bakstu savu sudu es esmu uzbudinats ka elle es esmu erms"
# input_string = "Im out here stroking my dick I got lotion on my dick im just stroking my shit Im horny as fuck Im a freak"
output_file = "output.wav"
string_to_sound_byte(input_string, output_file, duration_ms=200, sample_rate=44100)
