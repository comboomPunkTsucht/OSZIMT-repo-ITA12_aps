sudo echo 'deb https://deb.volian.org/volian/ scar main' | sudo tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list 
sudo wget -qO - https://deb.volian.org/volian/scar.key | sudo tee /etc/apt/trusted.gpg.d/volian-archive-scar-unstable.gpg
sudo apt update
sudo apt install nala neofetch cmatrix htop openjdk-17-jdk build-essential procps curl file git -yf
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install lolcat
cd /workspaces/OSZIMT-repo-ITA12_aps/.config/ookla-speedtest-1.1.1-linux-x86_64/
sudo chmod +x ./"speedtest"
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
fish -c "omf install bobthefish" 
cp -r /workspaces/OSZIMT-repo-ITA12_aps/.config/  /home/vscode/
fish
cd ..
bash /workspaces/OSZIMT-repo-ITA12_aps/.config/font.sh
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
sudo dpkg -i /workspaces/OSZIMT-repo-ITA12_aps/.config/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
sudo wget -O ~/vsls-reqs https://aka.ms/vsls-linux-prereq-script 
sudo chmod +x ~/vsls-reqs
sudo ~/vsls-reqs
sudo dpkg -i /workspaces/OSZIMT-repo-ITA12_aps/.config/javafx_scenebuilder-2_0-linux-x64.deb
cd ..