<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1 class="app-card">Upcomming Events</h1>                                  
                    <xsl:for-each select="root/events/*">
                        <div class="app-card">
                        <h2><xsl:value-of select="./title"/></h2>                        
                        <p id="start">von: <xsl:value-of select="./start"/> bis: <xsl:value-of select="./end"/></p>    
                        <p>{{title}}</p>                    
                        <p><xsl:value-of select="./description"/></p>
                        </div>
                    </xsl:for-each>                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>