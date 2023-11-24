import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd

data = pd.read_csv('data.csv')

# Extract latitude, longitude, and altitude columns
latitude = data["lat"]
longitude = data["long"]
altitude = data["baro altitude"]

# Create a 3D plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Plot the 3D platform with a red color
ax.plot(latitude, longitude, altitude, marker='o', linestyle='-', color='red')

# Set axis labels
ax.set_xlabel('Latitude')
ax.set_ylabel('Longitude')
ax.set_zlabel('Altitude')

# Set the title
ax.set_title('Satelite 3D positioning')

# Show the plot
plt.show()
