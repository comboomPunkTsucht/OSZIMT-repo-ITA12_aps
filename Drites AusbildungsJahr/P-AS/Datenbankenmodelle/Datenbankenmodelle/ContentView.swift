//
//  ContentView.swift
//  Datenbankenmodelle
//
//  Created by mcpeaps_HD on 28/08/2023.
//

import SwiftUI

struct AppStorageView: View {
	@AppStorage("Datenbankenmodelle_AppStorage") var world:String?
	var body: some View {
		VStack {
			Image(systemName: "globe")
				.imageScale(.large)
				.foregroundStyle(.tint)
			Text("Hello\(world ?? "")")
			Button(action: {
				if world == "" {
					world = ", world!"
				}else {
					world = ""
				}
			}, label: {
				Image(systemName: "plus.circle")
			})
			
		}
		.padding()
		.frame(width: 200, height: 200)
	}
}

#Preview {
	AppStorageView()
}
