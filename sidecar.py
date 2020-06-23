import os
import time

sidecar_file_name = os.getenv("SIDECAR_FILE_NAME", "/tmp/sidecar.txt")


while True:
    f = open(sidecar_file_name, "w")
    #f.write("original-recipe")
    # f.write("new-recipe")
    f.write("")

    print("Sidecar output: ", f)
    f.close()
    time.sleep(10)
