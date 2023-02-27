cd apps/camera-app
# Generate a self-signed certificat
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
# Install the self-signed certificate
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain cert.pem
