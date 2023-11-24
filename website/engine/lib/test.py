from pydub import AudioSegment
from pydub.generators import Sine

def string_to_sound_byte(input_string, output_file_path, duration_ms=100, sample_rate=44100):
    # Create an empty audio segment
    audio = AudioSegment.silent()

    # Iterate through each character in the input string
    for char in input_string:
        # Convert the character to its ASCII code
        char_code = ord(char)
        
        # Create a sine wave with a frequency corresponding to the ASCII code
        sine_wave = Sine(char_code).to_audio_segment(duration=duration_ms)
        
        # Append the sine wave to the audio segment
        audio += sine_wave

    # Export the audio to a file
    audio.export(output_file_path, format="wav")

# Example usage:
input_string = "Hello world I am saying right now dawg"
output_file = "output_sound.wav"
string_to_sound_byte(input_string, output_file, duration_ms=100, sample_rate=44100)
