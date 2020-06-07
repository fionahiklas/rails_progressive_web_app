## Overview 

Simple progressive web application using rails as the server and 
REST API.

Testing out authentication and such things.

## Quickstart

### Check out the code

```
git clone https://github.com/fionahiklas/rails-progressive-web-app
cd rails-progressive-web-app
```

### Install Gems

Run the following

```
export USER_GEMS=`gem env | grep USER | sed -e 's/^.*\(\/home.*\)$/\1/'`
export PATH=$PATH:$USER_GEMS/bin

gem install bundler --user-install

bundle install --path vendor
```





## Rails Setup

### Prerequites 

You need to install the following packages with apt on Ubuntu
 
* build-essential
* ruby-dev
* zlib1g-dev
* libxml2-dev
* yarnpkg
 
__Note__: There is a package mapping from "yarn" to "cmdtest" on Ubuntu 20.04.  The package that gets installed is
a testing tool that appears to be for python.  The Ubuntu package installs yarn as `yarnpkg` fixed with this hack

```
ln -s /usr/bin/yarnpkg /usr/local/bin/yarn
```


### Creating project

```
bundle exec rails new .
```

This creates alot of files that need to be committed to git

Starting the server seemed to kick of the generation of more files although this may have been a delayed impact of
WebPacker failing due to lack of installed `yarn` tool for node.

```
bin/rails server
```

This command starts the rails server on port 3000


### Adding the PWA app

Creating a new controller for the application

```
bin/rails generate controller pwa main login token
```


## Network Setup

In order to test this application with windows single sign on it needs to have a Windows client machine
and Windows server.  It seems that these also need to have FQDN so need to setup a DNS server to make
sure that this resolves to the appropriate IP address.

Getting this working requires changes to VMWare's network configuration as well as running a private
DNS server.


### VMWare Player network configuration

Need to make sure the correct IP addresses are used

First of all make sure that the VMWare player isn't running and then execute the following command to 
stop the services

```
/etc/init.d/vmware stop
```

This should remove any `vmnet` devices, check with `ifconfig`

Once all the services are stopped, copy the files from `network/vmware` to `/etc/vmware`.  
On my system there is a `vmnet1` and a `vmnet8` device.  The former is for hostonly the latter 
is the NAT interface and this is what the VMs are connected to.


### DNS Server setup

Using [dnsmasq](https://wiki.debian.org/dnsmasq) to set this up.

After much hacking around it seems that `dnsmasq` can't be persuaded to connect to only the VMWare network 
interface or it's address.  It seems to obstinately connect to `0.0.0.0` all the time.  The only solution I've
found is to run it in a docker container, an [excellent image](https://hub.docker.com/r/andyshinn/dnsmasq) is 
available on [Docker hub](https://hub.docker.com/) run using the following command

```
docker run -d -p 192.168.209.1:53:53/tcp -p 192.168.209.1:53:53/udp --cap-add=NET_ADMIN andyshinn/dnsmasq:2.75 \
--address=/windowsserver.iwalab.internal/192.168.209.10 \
--address=/workstation.iwalab.internal/192.168.209.20 \
--address=/linuxhost.iwalab.internal/192.168.209.1 
```

Test that resolution works

```
dig windowsserver.iwalab.internal @192.168.209.1
```


On Ubuntu 20.04 it seems that there is a `systemd-resolved` process that actually handles DNS

```
lsof -i :53

COMMAND   PID            USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
systemd-r 648 systemd-resolve   12u  IPv4  23820      0t0  UDP localhost:domain 
systemd-r 648 systemd-resolve   13u  IPv4  23821      0t0  TCP localhost:domain
```

To list the current setup for DNS in `systemd-resolved` run the following command

```
resolvectl status
```

For example this includes the following settings for vmnet8

```
Link 10 (vmnet8)
      Current Scopes: none
DefaultRoute setting: no  
       LLMNR setting: yes 
MulticastDNS setting: no  
  DNSOverTLS setting: no  
      DNSSEC setting: no  
    DNSSEC supported: no  
```

Run the following two commands to setup the DNS for that specific link

```
sudo resolvectl dns 10 192.168.209.1
sudo resolvectl domain 10 iwalab.internal
```

Now looks like this

```
Link 10 (vmnet8)
      Current Scopes: DNS            
DefaultRoute setting: yes            
       LLMNR setting: yes            
MulticastDNS setting: no             
  DNSOverTLS setting: no             
      DNSSEC setting: no             
    DNSSEC supported: no             
  Current DNS Server: 192.168.209.1  
         DNS Servers: 192.168.209.1  
          DNS Domain: iwalab.internal
```


## Windows Server 2012

### Downloading the VM

You can download a 180day evaluation version from Microsoft [here](https://www.microsoft.com/en-GB/evalcenter/evaluate-windows-server-2012-r2)

Download the ISO and then follow the steps to create a new VMware virtual machine and install
Windows 2012 R2 from the ISA.

Prevent password from expiring (this is just a lab VM it's going to be thrown away) by going 
to the start menu and searching for "Local Security Policy", then click on "Account Policies" -> 
"Password Policy" and change "Maximum Password Age" to "365" - the VM will expire before the 
password does.

Changed to a fixed IP address by right clicking on the connection icon in the system try and 
opening the "Network and Sharing Center".  Click on the "ethernet0" connection, "Properties" 
button, "Internet Protocol Version 4" and then press the "properties" button.

Select "Use the following IP address" and set the various options in this dialog as follows

| Setting                   | Value          |
| ------------------------- | -------------- |
| IP Address                | 192.168.209.10 |
| Subnet mask               | 255.255.255.0  |
| Default gateway           | 192.168.209.2  |
| Preferred DNS server      | 192.168.209.1  |

Click apply/ok.

Also go to Control Panel again and search for "Rename this computer", click on the "change" button
and change the name to "windowsserver".  You need to restart for this change to take affect.



### Installing Enterprise CA

This is a pre-requisite for setting up ADFS.

* Open Server Manager
* Select "Add Roles and Features"
* Click next on the information page
* "Installation Type" is "Role-based or feature-based installation"
* "Server selection" is "windowsserver", i.e. the current machine
* Click on "Active Directory Certificate Services"
* Click "Add Features" on the dialog that appears
* Click on "next"
* 

## Windows Developer VM

### Downloading the VM




## Notes

### PWA

* [SSO OAuth2.0 login with full screen](https://medium.com/@jonnykalambay/progressive-web-apps-with-oauth-dont-repeat-my-mistake-16a4063ce113)
* [Is service worker ready https://pwabook.com/isswready](https://jakearchibald.github.io/isserviceworkerready/)

### Rails

* [Webpacker](https://github.com/rails/webpacker)
* Check the status of webpacker with this command

```
bin/rails webpacker:info
```

* Hit an issue with the following error being shown by this command

```
Ruby: ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-linux-gnu]
Rails: 6.0.3.1
Webpacker: 4.2.2
Node: v10.19.0
Yarn: 1.22.4

npm ERR! missing: @rails/webpacker@4.2.2, required by rails_progressive_web_app@0.1.0
@rails/webpacker: 
rails_progressive_web_app@0.1.0 /home/fiona/wd/nps/playground/rails-progressive-web-app
└── UNMET DEPENDENCY @rails/webpacker@4.2.2 

Is bin/webpack present?: true
Is bin/webpack-dev-server present?: true
Is bin/yarn present?: true
```

* It seems that this is covered by this [bug](https://github.com/rails/webpacker/issues/1078)
* Also seems that `npm` shouldn't be used to handle dependencies


 
## References

### Rails

* [Asset pipeline](https://guides.rubyonrails.org/asset_pipeline.html)
* [Avoid CORS exceptions](https://die-antwort.eu/techblog/2018-08-avoid-invalid-cross-origin-request-with-catch-all-route/)
* [Protect from forgery API](https://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection/ClassMethods.html)
* [Adding custom JavaScript to Rails](https://dev.to/morinoko/adding-custom-javascript-in-rails-6-1ke6)

 
### PWA
 
 * [PWA Structure](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/App_structure)
 * [Securing tokens in progressive web apps](https://www.mckennaconsultants.com/securing-tokens-in-a-progressive-web-app/)
 * [Developing PWAs, Fetch API](https://codelabs.developers.google.com/codelabs/pwa-fetch/#0)
 * [Using Service Workers as Auth Relay](https://itnext.io/using-service-worker-as-an-auth-relay-5abc402878dd)
 * [PWA, OAuth, Authentication in PopUps](https://medium.com/@jonnykalambay/progressive-web-apps-with-oauth-dont-repeat-my-mistake-16a4063ce113)
 
 

### JavaScript

* [WebPack](https://webpack.js.org/guides/getting-started/)
* [Beginners guide to WebPack](https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460)
* [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
* [Window API](https://developer.mozilla.org/en-US/docs/Web/API/Window)
* [Location API](https://developer.mozilla.org/en-US/docs/Web/API/Location)



### Linux

* [dnsmasq](https://wiki.debian.org/dnsmasq)
* [dig](https://linux.die.net/man/1/dig)
* [Using journalctl to see logs](https://www.loggly.com/ultimate-guide/using-journalctl/)
* [chroot namespaces cgroups](https://itnext.io/chroot-cgroups-and-namespaces-an-overview-37124d995e3d)
* [Linux namespaces](https://en.wikipedia.org/wiki/Linux_namespaces)
* [Docker RUN, CMD, ENTRYPOINT](https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/)
* [Linux capabilities](https://linux-audit.com/linux-capabilities-101/)
* [Docker networking](https://docs.docker.com/config/containers/container-networking/)
* [docker-dnsmasq](https://github.com/andyshinn/docker-dnsmasq/blob/master/Dockerfile)
* [Docker hub dnsmasq](https://hub.docker.com/r/andyshinn/dnsmasq)
* [resolvectl](https://www.freedesktop.org/software/systemd/man/resolvectl.html)
* [systemd-resolved](https://wiki.archlinux.org/index.php/Systemd-resolved)


### VMWare 

* [Editing DHCP config](https://pubs.vmware.com/workstation-11/index.jsp?topic=%2Fcom.vmware.ws.using.doc%2FGUID-04D783E1-3AB9-4D98-9891-2C58215905CC.html)


### Windows 2012R2

* [Disable Password Expiration](http://sptrac.com/wordpress/?p=1285)
* [Windows 2012R2 Trial version](https://www.microsoft.com/en-GB/evalcenter/evaluate-windows-server-2012-r2)
