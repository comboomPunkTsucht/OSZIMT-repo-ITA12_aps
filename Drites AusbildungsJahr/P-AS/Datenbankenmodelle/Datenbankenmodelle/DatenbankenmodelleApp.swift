//
//  DatenbankenmodelleApp.swift
//  Datenbankenmodelle
//
//  Created by mcpeaps_HD on 28/08/2023.
//

import SwiftUI

@main
struct DatenbankenmodelleApp: App {
    var body: some Scene {
        WindowGroup("AppStorage") {
			AppStorageView()
        }
		WindowGroup("UserDefaults") {
			UserDefaultsView()
		}
    }
}

