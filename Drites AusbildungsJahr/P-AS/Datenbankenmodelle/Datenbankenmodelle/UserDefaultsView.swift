//
//  UserDefaultsView.swift
//  Datenbankenmodelle
//
//  Created by mcpeaps_HD on 28/08/2023.
//

import SwiftUI

struct UserDefaultsView: View {
	@State private var world: String?
	
	init() {
		_world = State<String?>(initialValue: UserDefaults.standard.string(forKey: "Datenbankenmodelle_UserDefaults"))
	}
	var body: some View {
		VStack {
			Image(systemName: "globe")
				.imageScale(.large)
				.foregroundStyle(.tint)
			Text("Hello\(world ?? "")")
			Button(action: {
				if world == "" {
					world = ", world!"
				} else {
					world = ""
				}
				UserDefaults.standard.set(world, forKey: "Datenbankenmodelle_UserDefaults")
			}, label: {
				Image(systemName: "plus.circle")
			})

		}
		.padding()
		.frame(width: 200, height: 200)
	}
}

#Preview {
    UserDefaultsView()
}
