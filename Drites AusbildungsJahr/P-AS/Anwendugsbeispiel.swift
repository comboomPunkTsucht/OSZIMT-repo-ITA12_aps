import SwiftUI
import WebKit

class WebViewManager: ObservableObject {
	@Published var webView: WKWebView
	@AppStorage("ITA 12_searchEngine") var searchEngine: String?
	
	init(for configuration: WKWebViewConfiguration) {
		self.webView = WKWebView(frame: .zero, configuration: configuration)
	}
	
	func search(for searchText: String) {
			// .. more search revelents conditions

				} else {
						// Perform a search using the specified search engine or DuckDuckGo as a fallback
					if let encodedSearchText = searchText.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
						let searchURLString = "\(searchEngine ?? "https://duckduckgo.com/?q=")\(encodedSearchText)"
						if let url = URL(string: searchURLString) {
							webView.load(URLRequest(url: url))
						}
					}
				}
			}
		}
	}
	
	func addProtocolToURL(_ urlString: String) -> URL? {
		if let url = URL(string: urlString), url.scheme != nil {
			return url
		} else if urlString.range(of: "^[a-zA-Z0-9]+\\.[a-zA-Z0-9]+\\..+$", options: .regularExpression) != nil,
				  let encodedURLString = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed),
				  let urlWithProtocol = URL(string: "https://" + encodedURLString) {
			return urlWithProtocol
		}
		return nil
	}
}


struct SettingsView: View {
	@AppStorage("ITA 12_searchEngine") var searchEngine: String?
	
	let searchEngines = ["Google", "Bing", "DuckDuckGo", "Yahoo", "Other"]
	
	@AppStorage("ITA 12_selectedSE") var selectedSEIndex: Int = 2  // Default to "DuckDuckGo" (index 2)
	@AppStorage("ITA 12_cSE") var cSE: String?
	@AppStorage("ITA 12_cSEisSet") var cSEisSet: Bool?
	
	init() {
		if cSEisSet ?? false {
			cSE = searchEngine
		}
	}
	
	func formatSearchEngineString(for unformatted: String) -> String {
		let delimiter = "%s"
		let output = unformatted.lowercased().components(separatedBy: delimiter)
		return output[0]
	}
	
	func safeSE() {
		switch selectedSEIndex {
			case 0:
				searchEngine = "https://www.google.com/search?q="
			case 1:
				searchEngine = "https://www.bing.com/search?q="
			case 3:
				searchEngine = "https://search.yahoo.com/search?p="
			case 4:
				cSEisSet = true
				searchEngine = formatSearchEngineString(for: cSE!)
			default:
				searchEngine = "https://duckduckgo.com/?q="
		}
	}
	
	var body: some View {
		VStack {
			Form {
				Section(header: Text("Search Engine")) {
					Picker("Select Search Engine", selection: $selectedSEIndex) {
						ForEach(0..<searchEngines.count, id: \.self) { index in
							Text(searchEngines[index])
						}
					}
					
                    // for other a textField
					
					Button("Save Search Engine", action: {
						safeSE()
					})

