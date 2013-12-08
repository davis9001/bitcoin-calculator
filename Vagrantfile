# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "debian-wheezy-64-vanilla"
  config.vm.box_url = "https://dl.dropboxusercontent.com/s/xymcvez85i29lym/vagrant-debian-wheezy64.box"

  # Provision via shell:
  config.vm.provision :shell, :path => "bootstrap.sh"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network :forwarded_port, guest: 80, host: 8080

  config.vm.synced_folder "./", "/var/www", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775,fmode=664"]

end
