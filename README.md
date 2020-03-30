## Epidemic Monitoring Center (EMC)

## Development Environment Setup

*TOC*
* <a href="#jdk8">Install Oracle JDK 8 / OpenJDK 8</a>
* <a href="#gradle">Install Gradle</a>
* <a href="#docker">Install Docker</a>
* <a href="#build">Make build and make local test</a>

---

### Install Oracle JDK 8/ OpenJDK 8 <a name="jdk8" />

1. Install

    _Mac_

    1. Download *jdk-8u161-macosx-x64.dmg* from Oracle site: http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html .
    2. Open the dmg, and follow on-screen instruction to install.

    _CentOS_

        ```
        sudo yum -y install java-1.8.0-openjdk
        ```

2. Check version: Current is *1.8.0_161*

    ```
    $JAVA_HOME/bin/java -version
    ```

---

### Install Gradle <a name="gradle" />

1. Installation

    Ref: [Gradle | Installation](https://gradle.org/install/)

    _Mac_

    1. Install homebrew

        ```
        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        ```

    2. Install Gradle from homebrew

        ```
        brew install gradle
        ```

    _CentOS_

        ```
        yum install -y wget unzip which
        wget https://services.gradle.org/distributions/gradle-5.6.4-bin.zip
        mkdir /opt/gradle
        unzip -d /opt/gradle gradle-5.6.4-bin.zip
        export PATH=$PATH:/opt/gradle/gradle-5.6.4/bin
        ```

2. Check version: Current is *5.6.4*

    ```
    gradle -v
    ```

---

### Install docker <a name="docker" />

Notes: Install docker if you would like to run the testing locally

1. Installation

    _Mac_

    Ref: [Docker | Installation | Mac](https://docs.docker.com/docker-for-mac/install/)

    0. DO NOT INSTALL THE DOCKER FROM HOMEBREW, WHICH IS OLDER VERSION AND NOT MAINTAINED ANYMORE.
    1. Download the dmg from [Docker for Mac (Stable)](https://download.docker.com/mac/stable/Docker.dmg), open it and follow normal Mac applicaiton installation procedure to complete it.
    2. Start docker daemon with running "Docker", the cute whale icon, from launchpad.

    _CentOS_

    Ref: [Docker | Installation | CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)

    1. Install required package with yum as root:

        ```
        yum install -y yum-utils device-mapper-persistent-data lvm2
        ```

    2. Add docker-ce repo:

        ```
        yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        ```

    3. Install docker:

        * Install latest version with:

            ```
            yum install -y docker-ce
            ```

        or,

        * Install specific version with:

            ```
            # Check versions
            yum list docker-ce --showduplicates | sort -r
            # Install specific version
            yum install <FULLY-QUALIFIED-PACKAGE-NAME>
            ```

    4. Start docker daemon

        ```
        systemctl start docker
        ```

2. Check version: (Ensure the docker daemon is running in prior.)

    ```
    docker -v
    ```

---

### Make build and make local test <a name="build" />

1. Make gradle build

    Change directory to project root, then run:

    ```
    gradle clean build docker
    ```

2. Run docker compose

    Change directory to ```docker/``` under project root, then run:

    ```
    docker-compose up -d
    ```

3. Open brower, and then navigate to ```http://localhost:28080/```
