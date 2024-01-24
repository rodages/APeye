open Farmer
open Farmer.Builders
open Codat.DevOps.Deployment

let appKey = "template-ui" // Replace this with the name of your app.
let resourceKey = "template" // Used to template the resource group and resource names. Replace this with the name of your app.
let appServicePlan =
    { Integration =
        ExternalResource.appServicePlan
            (ResourceGroup "") // E.g. "codat-integration-redwood"
            (ResourceName "") // E.g. "codat-intg-redwood-100-v3-win"
      Staging =
        ExternalResource.appServicePlan
            (ResourceGroup "") // E.g. "codat-staging-redwood"
            (ResourceName "") // E.g. "codat-stag-redwood-100-v3-win"
      Production =
        ExternalResource.appServicePlan
            (ResourceGroup "") // E.g. "codat-production-redwood"
            (ResourceName "") } // E.g. "codat-prod-redwood-100-v3-win"
let vnet = SharedInfrastructure.Network.launch // Replace this with the correct virtual network for your app
let subnetRef = vnet.subnetRef // Replace this with the correct subnet for your app
let subnet = "template-100-v3-win" // Subnet for the app. Replace this with your own subnet.

// Add tags to help identify this webApp
let commonTags (env:Environment) = [
    "Environment", env.longName
    "ProductGroup", "" // Product group of the team that owns the repo. E.g. "Launch"
    "OwningTeam", "" // Team that owns the repo. E.g. "Peach"
    "DomainArea", "" // Product domain. e.g. "Products"
    "SlackChannel", "" // Slack channel of the owning team. E.g. "#tech-team-peach" 
]


let cmdLineSpec = 
    (commandLine {
      input "artifact-path"
    })

let infrastructure cmdLine (env: Environment) = 
    let deploySlot = appSlot { name "deploy" }

    let subnetRef = (subnetRef env subnet) 

    let webApp = webApp env {
        name (env.standardizedResourceName(appKey, region=Region.ukSouth))
        link_to_unmanaged_service_plan (appServicePlan |> Environment.valueFor env)
        link_to_unmanaged_vnet subnetRef.ResourceId

        // The path that will be checked to see if the app is online before swapping slot 
        health_check_path "/status"

        operating_system OS.Windows

        add_tags (commonTags env)
    
        add_slot deploySlot

        #if !DEBUG 
        // After deployment, upload the zip file at the path given in the command line argument "artifact-path"
        zip_deploy_slot deploySlot.Name (cmdLine |> CommandLine.getRequiredInput "artifact-path")
        #endif
    }

    // Create private endpoint for the app in each environment
    let privateEndpoints = webApp.MakePrivateEndpoints env vnet

    resourceGroup {
        location Location.UKSouth

        add_tags (commonTags env)

        add_resource webApp 
        add_resources privateEndpoints
    }

Deployment.run appKey infrastructure cmdLineSpec