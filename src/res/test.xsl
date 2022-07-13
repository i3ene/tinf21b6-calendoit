<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1 class="app-card">Upcomming Events</h1>    
                <xsl:variable name="yearNow" as="xs:numeric" select="substring(@dateTime,1,4)"/>
                <xsl:variable name="monthNow" as="xs:numeric" select="substring(@dateTime,6,2)"/>
                <xsl:variable name="dayNow" as="xs:numeric" select="substring(@dateTime,9,2)"/>
                    <xsl:for-each select="root/events/*">   
                        <xsl:variable name="yearEvent" as="xs:numeric" select="substring(./start,1,4)"/>
                        <xsl:variable name="monthEvent" as="xs:numeric" select="substring(./start,6,2)"/>
                        <xsl:variable name="dayEvent" as="xs:numeric" select="substring(./start,9,2)"/>
                        <!-- Check if event is today -->
                       <xsl:if test="$yearNow=$yearEvent and $monthNow=$monthEvent and $dayNow=$dayEvent " >
                            <div class="app-card">
                            <h2><xsl:value-of select="./title"/></h2>    
                            
                            <p id="start">
                                von:
                                <xsl:call-template name="format-time">
                                    <xsl:with-param name="iso-date" select="./start"/>
                                </xsl:call-template>
                                
                                bis:
                                <xsl:call-template name="format-time">
                                    <xsl:with-param name="iso-date" select="./end"/>
                                </xsl:call-template>
                            </p>    
                                           
                            <p><xsl:value-of select="./description"/></p>     
                            <p>
                                <xsl:call-template name="format-iso-date">
                                    <xsl:with-param name="iso-date" select="./start"/>
                                </xsl:call-template>
                            </p>                          
                            </div>
                             
                            
                        </xsl:if> 
                    </xsl:for-each>    
                    


            </body>
        </html>
    </xsl:template>


    <!-- DateTime zu Date Formatieren (MM dd yyyy)-->
     <xsl:template name="format-iso-date">
        <xsl:param name="iso-date"/>
        <xsl:variable name="year" select="substring($iso-date, 1, 4)"/>
        <xsl:variable name="month" select="substring($iso-date, 6, 2)"/>
        <xsl:variable name="day" select="substring($iso-date, 9, 2)"/>        
        <xsl:value-of select="concat($month, ' ',$day, ', ', $year)"/>
    </xsl:template>

    <!-- DateTime zu Zeit formatieren (HH:mm) -->
    <xsl:template name="format-time">
        <xsl:param name="iso-date"/>
        <xsl:variable name="hour" select="substring($iso-date, 12, 2)"/>
        <xsl:variable name="minute" select="substring($iso-date, 15, 2)"/>
             
        <xsl:value-of select="concat($hour,':',$minute, ', ')"/>
    </xsl:template>
</xsl:stylesheet>