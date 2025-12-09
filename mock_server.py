from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import urllib.parse

class MockGoogleAppsScriptHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse the query parameters
        parsed_path = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_path.query)

        action = query_params.get('action', [None])[0]
        form_type = query_params.get('formType', [None])[0]

        if action == 'getGreetings':
            # Return mock greetings data
            greetings = [
                {"timestamp": "2023-10-01T10:00:00Z", "nama": "Test User", "ucapan": "Selamat menempuh hidup baru!"}
            ]
            response = json.dumps(greetings)
        elif form_type == 'rsvp':
            # Simulate RSVP submission
            nama = query_params.get('nama', [''])[0]
            status = query_params.get('status', [''])[0]
            jumlah = query_params.get('jumlah', [''])[0]
            print(f"RSVP Received: Nama={nama}, Status={status}, Jumlah={jumlah}")
            response = json.dumps({"success": True})
        elif form_type == 'greeting':
            # Simulate Greeting submission
            nama = query_params.get('nama', [''])[0]
            ucapan = query_params.get('ucapan', [''])[0]
            print(f"Greeting Received: Nama={nama}, Ucapan={ucapan}")
            response = json.dumps({"success": True})
        else:
            response = json.dumps({"error": "Invalid request"})

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')  # Allow CORS
        self.end_headers()
        self.wfile.write(response.encode('utf-8'))

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, MockGoogleAppsScriptHandler)
    print(f"Mock Google Apps Script server running on port {port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
