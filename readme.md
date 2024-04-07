In new version, package **Microsoft.AspNetCore.SignalR** is deprecated, because server functionality is now contained in **Microsoft.AspNetCore.App** framework. To use SignalR, you can add reference to this framework in project, by adding to .csproj file item group like:

```
<ItemGroup>  
     <FrameworkReference Include="Microsoft.AspNetCore.App" />  
 </ItemGroup> 
```